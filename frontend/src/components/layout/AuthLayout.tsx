function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary h-screen flex justify-center items-end p-6">
      <div className="h-full w-full"></div>
      <div className="bg-white rounded-lg shadow-lg px-16 py-12 w-full h-full flex flex-col max-w-xl ">
        {children}
        <p className="text-center text-sm text-muted-foreground justify-self-end-safe">
          Made by MushieMush
        </p>
      </div>
    </div>
  );
}
export default AuthLayout;
