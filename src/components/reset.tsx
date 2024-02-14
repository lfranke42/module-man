import {useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";

type ResetButtonProps = {
  course: string | undefined,
  updateCourse: () => void,
}

export function Reset(props: ResetButtonProps) {
  const {data: session, status} = useSession()

  const handleDelete = () => {
    fetch(`/api/users/${props.course}`, {
      method: "DELETE",
    }).catch((error) => {
      console.error("Error:", error);
    })

    props.updateCourse();
  }


  return (
    <>
      {status == "authenticated" && props.course != undefined &&
          <Button variant="destructive" onClick={handleDelete}>
              Reset
          </Button>
      }
    </>
  )
}