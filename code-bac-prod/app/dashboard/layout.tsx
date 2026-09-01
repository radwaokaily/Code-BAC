import {redirect} from "next/navigation";
import type {ReactNode} from "react";import {getCurrentUser} from "@/lib/auth";import Sidebar from "@/components/Sidebar";
export default async function DashboardLayout({children}:{children:ReactNode}){const u=await getCurrentUser();if(!u)redirect("/login");if(u.mustChangePassword)redirect("/change-password");return <div className="shell"><Sidebar user={u}/><main className="content">{children}</main></div>}
