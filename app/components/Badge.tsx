function Badge(props: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center justify-self-ends items-center bg-red-500 rounded-md text-white font-bold px-2 py-1">
      {props.children}
    </div>
  );
}

export default Badge;
