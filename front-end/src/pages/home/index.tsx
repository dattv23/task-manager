import { Link } from "react-router-dom"
import { Button } from "../../components/Button"
import { IMAGES } from "../../assets/images/images"

export const Home = () => {
      return (
            <div className="container mx-auto relative h-screen">
                  <div className="flex justify-between px-8">
                        <Link to={"/"} className="text-primary text-[48px] font-semibold font-['Poppins']">Alliance.</Link>
                        <div className="flex justify-end items-center gap-2">
                              <Button to="/register" variant={"primary"} size={"sm"} className="w-28">Sign Up</Button>
                              <Button to="/login" variant={"secondary"} size={"sm"} className="w-28">Sign In</Button>
                        </div>
                  </div>
                  <div className="px-8 grid lg:grid-cols-2 md:grid-cols-1 md:gap-2 relative">
                        <div className="mt-36 flex flex-col gap-2">
                              <p className="text-5xl font-semibold font-['Poppins']">
                                    Task Management &<br />To-Do List
                              </p>
                              <p className="text-zinc-500 text-[24px] font-normal font-['Poppins']">This productive tool is designed to help<br />you better manage your task project-wise <br />conveniently!</p>
                              <Button to="/dashboard" className="w-full max-w-[448px] mt-4 text-2xl font-semibold">Let’s Start</Button>
                        </div>
                        <div className="z-10">
                              <img src={IMAGES.female} className="absolute top-40 left-[780px] w-[448px]" />
                              <img src={IMAGES.calendar} className="absolute top-36 right-24" />
                              <img src={IMAGES.stopwatch} className="absolute left-[720px] top-10 h-[140px]" />
                              <img src={IMAGES.pie_chart} className="absolute left-[680px] top-64 h-16" />
                              <img src={IMAGES.notifications} className="absolute left-[1120px] top-80" />
                        </div>
                  </div>
                  <img src={IMAGES.vector} className="absolute bottom-0 lg:h-40 z-0 w-[1200px]" />
            </div >
      )
}
