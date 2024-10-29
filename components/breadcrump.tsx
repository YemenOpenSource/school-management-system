'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

type Props = {

}

export default function BreadCrump() {
  const pathName = usePathname()
  console.log(pathName)
  console.log(pathName?.split("/").splice(1))

  const pathNameArray = pathName?.split("/").splice(1)

  const pathNameArryExeptUpdate = pathNameArray.filter((path)=> path !== 'update')
  const indexOfTheRoute = (path: string) => pathNameArryExeptUpdate.slice(0, pathNameArryExeptUpdate.indexOf(path) + 1).join('/')

  console.log(indexOfTheRoute('update'))

  console.log(pathNameArray[pathNameArray.length - 1])


  return (
    <div>
      <ul className="flex items-start justify-start gap-2">
        {pathNameArryExeptUpdate.map((path) =>
          <li key={path}>
            {
              pathNameArryExeptUpdate[pathNameArryExeptUpdate.length - 1] !== path
                ? <>
                 <Link href={`/${indexOfTheRoute(path)}`} className="cursor-pointer text-blue-500 hover:underline">
                  {path} 
                </Link>
                <span> /</span>
                </>
                : path
            }
          </li>)}
      </ul>
    </div>
  )
}