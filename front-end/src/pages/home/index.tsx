import { Button } from "../../components/Button"

export const Home = () => {
      return (
            <div className="flex flex-col">
                  <Button size={"lg"} variant={"primary"} className="mx-2 my-2">Primary</Button>
                  <Button size={"lg"} variant={"secondary"} className="mx-2 my-2">Secondary</Button>
                  <Button size={"lg"} variant={"tetiary"} className="mx-2 my-2">Tetiary</Button>
                  <Button size={"md"} variant={"primary"} className="mx-2 my-2">Primary</Button>
                  <Button size={"md"} variant={"secondary"} className="mx-2 my-2">Secondary</Button>
                  <Button size={"md"} variant={"tetiary"} className="mx-2 my-2">Tetiary</Button>
                  <Button size={"sm"} variant={"primary"} className="mx-2 my-2">Primary</Button>
                  <Button size={"sm"} variant={"secondary"} className="mx-2 my-2">Secondary</Button>
                  <Button size={"sm"} variant={"tetiary"} className="mx-2 my-2">Tetiary</Button>
            </div>
      )
}
