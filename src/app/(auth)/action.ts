"use server";

import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const company = formData.get("company") as string;
  const phone = formData.get("phone") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !password || !fullName || !company || !company || !phone) {
    return;
  }

  if (password !== confirmPassword) {
    return;
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return;
  }

  if (authData.user) {
    const { error: insertError } = await supabase.from("users").insert({
      id: authData.user.id,
      name: fullName,
      company_name: company,
      phone_number: phone,
      email: email,
    });

    if (insertError) {
      console.error("Error insert ke tabel users:", insertError);
    }
  }

  redirect("/login?registered=true");
}
