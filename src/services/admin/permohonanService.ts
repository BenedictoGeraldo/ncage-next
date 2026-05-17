"use server";

import { createAdminClient } from "@/src/utils/supabase/admin";
import { revalidatePath } from "next/cache";
import { generateCertificate } from "@/src/utils/certificate";
import { createNotification } from "@/src/lib/notifications";

async function generateSequentialNCAGE(
  supabase: ReturnType<typeof createAdminClient>,
): Promise<string> {
  const { data, error } = await supabase
    .from("ncage_records")
    .select("ncage_code")
    .like("ncage_code", "____Z")
    .order("ncage_code", { ascending: false })
    .limit(1);

  let maxNumber = 0;

  if (!error && data && data.length > 0) {
    const code = data[0].ncage_code as string | null;
    if (code && /^\d{4}Z$/.test(code)) {
      maxNumber = parseInt(code.substring(0, 4), 10);
    }
  }

  const nextNumber = maxNumber + 1;
  const padded = String(nextNumber).padStart(4, "0");
  return `${padded}Z`;
}

export async function updateStatusPermohonan(
  applicationId: string,
  statusId: 3 | 4 | 5,
  catatanRevisi?: string,
) {
  const supabase = createAdminClient();

  const updatePayload: Record<string, unknown> = {
    status_id: statusId,
    updated_at: new Date().toISOString(),
  };

  if (statusId === 3 && catatanRevisi) {
    updatePayload.revision_notes = catatanRevisi;
  }

  let appData: Record<string, unknown> | null = null;

  if (statusId === 4) {
    const { data, error: appError } = await supabase
      .from("ncage_applications")
      .select(
        `
        user_id,
        ncage_code,
        company_details (
          name, street, city, province, postal_code, phone, email, website
        ),
        application_identities (
          entity_type
        )
      `,
      )
      .eq("id", applicationId)
      .single();

    if (appError || !data) {
      console.error("Gagal mengambil data aplikasi:", appError);
      return {
        success: false,
        message: "Gagal memuat data perusahaan untuk sertifikat.",
      };
    }

    appData = data as unknown as Record<string, unknown>;

    const company = Array.isArray(appData.company_details)
      ? (appData.company_details as Record<string, unknown>[])[0]
      : (appData.company_details as Record<string, unknown> | null);

    const ncageCode = (appData.ncage_code as string | null) || (await generateSequentialNCAGE(supabase));
    updatePayload.ncage_code = ncageCode;

    try {
      const certBuffer = await generateCertificate({
        ncage_code: ncageCode,
        entity_name: (company?.name as string) || "-",
        street: (company?.street as string) || "-",
        city: (company?.city as string) || "-",
        stt: (company?.province as string) || "-",
        psc: (company?.postal_code as string) || "-",
        tel: (company?.phone as string) || "-",
        ema: (company?.email as string) || "-",
        www: (company?.website as string) || "-",
      });

      const certFilename = `Sertifikat_NCAGE_${ncageCode}_${Date.now()}.docx`;
      const certPath = `${appData.user_id}/certificates/${certFilename}`;

      const { error: uploadError } = await supabase.storage
        .from("ncage_documents")
        .upload(certPath, certBuffer, {
          contentType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

      if (uploadError) {
        console.error("Gagal mengunggah sertifikat:", uploadError);
        return { success: false, message: "Gagal menyimpan file sertifikat." };
      }

      updatePayload.domestic_certificate_path = certPath;
    } catch (e) {
      console.error("Error saat men-generate sertifikat:", e);
      return {
        success: false,
        message: "Terjadi kesalahan saat memproses sertifikat (docx).",
      };
    }
  }

  const { error } = await supabase
    .from("ncage_applications")
    .update(updatePayload)
    .eq("id", applicationId);

  if (error) {
    console.error("[updateStatusPermohonan] Error:", error.message);
    return { success: false, message: error.message };
  }

  const userId = appData?.user_id as string | null | undefined;

  if (statusId === 3) {
    const { data: appMeta } = await supabase
      .from("ncage_applications")
      .select("user_id")
      .eq("id", applicationId)
      .single();

    const metaUserId = appMeta?.user_id;

    if (metaUserId) {
      await createNotification({
        user_id: metaUserId,
        type: "warning",
        title: "Permohonan Butuh Perbaikan",
        description: catatanRevisi
          ? `Permohonan NCAGE Anda memerlukan perbaikan. Catatan dari admin: ${catatanRevisi}`
          : "Permohonan NCAGE Anda memerlukan perbaikan. Silakan cek catatan revisi di halaman Pantau Status.",
        related_application_id: applicationId,
      });
    }
  }

  if (statusId === 4 && userId) {
    const ncageCode = updatePayload.ncage_code as string;

    const company = Array.isArray(appData?.company_details)
      ? (appData!.company_details as Record<string, unknown>[])[0]
      : (appData?.company_details as Record<string, unknown> | null);
    const identity = Array.isArray(appData?.application_identities)
      ? (appData!.application_identities as Record<string, unknown>[])[0]
      : (appData?.application_identities as Record<string, unknown> | null);

    const { data: existingRecord } = await supabase
      .from("ncage_records")
      .select("id")
      .eq("ncage_application_id", applicationId)
      .maybeSingle();

    if (existingRecord) {
      const { error: updateError } = await supabase
        .from("ncage_records")
        .update({
          domestic_certificate_path:
            updatePayload.domestic_certificate_path || null,
          issued_at: new Date().toISOString(),
        })
        .eq("ncage_application_id", applicationId);

      if (updateError) {
        console.error("Gagal update ncage_records:", updateError.message);
        return {
          success: false,
          message: "Gagal memperbarui ncage_records: " + updateError.message,
        };
      }
    } else {
      const { error: insertError } = await supabase
        .from("ncage_records")
        .insert({
          ncage_application_id: applicationId,
          ncage_code: ncageCode || (appData?.ncage_code as string | undefined),
          ncagesd: "A",
          domestic_certificate_path:
            updatePayload.domestic_certificate_path || null,
          issued_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error("Gagal insert ke ncage_records:", insertError.message);
        return {
          success: false,
          message: "Gagal menyimpan ke ncage_records: " + insertError.message,
        };
      }
    }

    await createNotification({
      user_id: userId,
      type: "success",
      title: "Sertifikat NCAGE Diterbitkan",
      description: `Selamat! Permohonan NCAGE Anda telah disetujui dan kode NCAGE ${ncageCode || ""} telah diterbitkan. Sertifikat dapat diunduh di halaman Pantau Status.`,
      related_application_id: applicationId,
    });
  }

  if (statusId === 5) {
    const { data: appMeta } = await supabase
      .from("ncage_applications")
      .select("user_id")
      .eq("id", applicationId)
      .single();

    const metaUserId = appMeta?.user_id;

    if (metaUserId) {
      await createNotification({
        user_id: metaUserId,
        type: "warning",
        title: "Permohonan NCAGE Ditolak",
        description:
          "Permohonan NCAGE Anda telah ditolak. Silakan hubungi tim Puskod Kemhan untuk informasi lebih lanjut.",
        related_application_id: applicationId,
      });
    }
  }

  revalidatePath("/admin/data-permohonan");
  revalidatePath(`/admin/data-permohonan/${applicationId}`);
  revalidatePath("/admin/ncage-records");

  return { success: true };
}
