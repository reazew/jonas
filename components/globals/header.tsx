
import Magnetic from "@/components/globals/magnetic"
import { Text } from "@/components/globals/text"
import { config } from "@/utils/config"
import Link from "next/link"

export const Header = () => {
  return (
    <header className="relative z-10">
      <nav className="py-8 max-w-600 mx-auto">
        <div className="px-4 flex justify-between items-center">
          <div className="flex gap-2">
            <Magnetic>
              <Text size="lg">
                Jonas Messias
              </Text>
            </Magnetic>
          </div>
          <ul className="flex gap-6">
            {
              Object.entries(config.links).map(([key, value]) => (
                <li key={key}>
                  <Magnetic>
                    <Text size="lg" className="capitalize">
                      <Link href={value} target="_blank">
                        {key}
                      </Link>
                    </Text>
                  </Magnetic>
                </li>
              ))
            }
          </ul>
        </div>
      </nav>
    </header>
  )
}