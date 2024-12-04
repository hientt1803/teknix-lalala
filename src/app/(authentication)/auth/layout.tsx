type AuthLayoutProps = {
  children: React.ReactNode;
};
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="container relative mx-auto overflow-hidden">{children}</div>
  );
};

export default AuthLayout;
