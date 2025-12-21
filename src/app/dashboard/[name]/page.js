import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Logged } from "./logged"
import NoLogged from "./nologged"

export default async function Page({ params }) {
  const session = await getServerSession(authOptions)
  const urlName = params.name

  if (!session) {
    return <NoLogged name={urlName} />
  }

  return <Logged />
}
