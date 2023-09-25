
export default function Lobby() {
  return (
    <main
      className="h-screen 
    bg-lobby bg-no-repeat bg-cover bg-center flex justify-center items-center"
    >
      <div className="w-[80%] h-[80%] bg-white bg-opacity-5  backdrop-blur-sm rounded-xl drop-shadow-lg flex flex-col justify-center items-center">
        <button
          type="button"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl   font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Play with friend
        </button>
        <button
          type="button"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl    font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Play with computer
        </button>
      </div>
    </main>
  );
}
