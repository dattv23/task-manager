import { AlertDialog } from "../../components/AlertDialog"

export const Home = () => {
      return (
            <div className="flex flex-row ">
                  <div className="flex flex-col mx-2 gap-2">
                        <AlertDialog title="Error" description="Something error" type={"error"} />
                        <AlertDialog title="Success" description="Something success" type={"success"} />
                        <AlertDialog title="Warning" description="Something warning" type={"warning"} />
                        <AlertDialog title="Infor" description="Something infor" type={"info"} />
                  </div>
                  <div className="flex flex-col mx-2 gap-2">
                        <AlertDialog title="Error" description="Something error" type={"error"} form={"stroked"} />
                        <AlertDialog title="Success" description="Something success" type={"success"} form={"stroked"} />
                        <AlertDialog title="Warning" description="Something warning" type={"warning"} form={"stroked"} />
                        <AlertDialog title="Infor" description="Something infor" type={"info"} form={"stroked"} />
                  </div>
            </div>
      )
}
