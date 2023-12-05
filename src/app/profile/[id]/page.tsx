export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-4xl">Welcome to the profile of <span className="text-3xl bg-red-500 text-black-500 p-2 rounded-2xl">{params.id}</span></h1>
    </div>
  );
}
