import { createAdminClient } from "@/src/utils/supabase/admin";

type NotificationType = "warning" | "success" | "info" | "security";

interface CreateNotificationParams {
  user_id: string;
  type: NotificationType;
  title: string;
  description: string;
  related_application_id?: string;
}

export async function createNotification(params: CreateNotificationParams) {
  const supabase = createAdminClient();

  const { error } = await supabase.from("notifications").insert({
    user_id: params.user_id,
    type: params.type,
    title: params.title,
    description: params.description,
    related_application_id: params.related_application_id ?? null,
  });

  if (error) {
    console.error(
      "[createNotification] Gagal membuat notifikasi:",
      error.message,
    );
  }
}
