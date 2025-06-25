import image404 from '../assets/images/404.png'

export const NotFound = () => {
  return (
    <div className="flex justify-center flex-col items-center w-full">
      <img src={image404} alt="width" height="600" />
      <p className="text-5xl mt-5">Page Not Found</p>
      <p className="text-2xl">The page you are looking for does not exist.</p>
    </div>
  )
}
