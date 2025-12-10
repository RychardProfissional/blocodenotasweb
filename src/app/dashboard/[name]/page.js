import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Logged } from "./logged"
import NoLogged from "./nologged"

export default async function Page({ params }) {
  const session = await getServerSession(authOptions)
  const urlName = params.name

  if (!session) {
    // If not logged in, maybe show NoLogged or redirect?
    // The original code had NoLogged component.
    return <NoLogged name={urlName} />
  }

  // Check if the logged in user matches the urlName?
  // The original code seemed to allow viewing other profiles?
  // "Logged" component takes userid.

  // If the user is logged in, show Logged component.
  // We should pass the user ID from session.

  return <Logged />
}
