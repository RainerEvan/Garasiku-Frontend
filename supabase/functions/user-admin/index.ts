// supabase/functions/user-admin/index.ts
// @ts-ignore
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// @ts-ignore
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, PUT, DELETE, OPTIONS",
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  }

  const supabase = createClient(
    // @ts-ignore
    Deno.env.get("SUPABASE_URL"),
    // @ts-ignore
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
  );

  const { method } = req;
  let body;
  try {
    body = await req.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: corsHeaders(),
    });
  }

  try {
    if (method === "POST") {
      const { email, password, fullname, username, role, status, phone } = body;

      const { data: user, error } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: {
          fullname,
          username,
          role,
          status,
        },
        phone,
        email_confirm: true,
      });

      if (error) throw error;

      return new Response(JSON.stringify({ message: "User created", user }), {
        status: 200,
        headers: corsHeaders(),
      });

    }


    if (method === "PUT") {
      const { id, username, fullname, email, phone, role, status, password } = body;

      const updateData: any = {
        email,
        phone,
        user_metadata: {
          username,
          fullname,
          role,
          status,
        },
      };

      // Hanya update password jika disediakan
      if (password) {
        updateData.password = password;
      }

      const { data, error } = await supabase.auth.admin.updateUserById(id, updateData);

      if (error) throw error;

      return new Response(JSON.stringify({ message: "User updated", data }), {
        status: 200,
        headers: corsHeaders(),
      });
    }


    if (method === "DELETE") {
      const { id } = body;

      const { error } = await supabase.auth.admin.deleteUser(id);
      if (error) throw error;

      return new Response(JSON.stringify({ message: "User deleted" }), {
        status: 200,
        headers: corsHeaders(),
      });
    }

    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: corsHeaders(),
    });

  }

});
