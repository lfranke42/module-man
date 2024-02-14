import {NavigationMenu, NavigationMenuItem, NavigationMenuList} from "@/components/ui/navigation-menu";
import {H1} from "@/components/typography/H1";
import {ModeToggle} from "@/components/mode-toggle";
import {Separator} from "@/components/ui/separator";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Login} from "@/components/login";
import {Reset} from "@/components/reset";

type HeaderProps = {
  handleCourseChange: (course: string) => void,
  updateCourse: () => void,
  course: string | undefined,
}

export function Header(props: HeaderProps) {
  return (
    <div className="sticky top-0">
      <NavigationMenu className="pt-4 pb-4 backdrop-blur-md">
        <NavigationMenuList className="container flex h-14 max-w-screen-2xl w-screen items-center pl-6 pr-6">
          <div className="mr-4 md:flex md:space-x-8">
            <NavigationMenuItem>
              <H1 className={"hidden md:block"}>Module-Man</H1>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex items-center">
              <Select onValueChange={props.handleCourseChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course..."/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="inb">INB</SelectItem>
                    <SelectItem value="inm">INM</SelectItem>
                    <SelectItem value="mib">MIB</SelectItem>
                    <SelectItem value="mib-bin">MIB-BIB</SelectItem>
                    <SelectItem value="mim">MIM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </NavigationMenuItem>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
            <NavigationMenuItem>
              <Login/>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Reset updateCourse={props.updateCourse} course={props.course}/>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ModeToggle/>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      <Separator/>
    </div>
  )
}