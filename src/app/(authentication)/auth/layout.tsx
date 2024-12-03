type AuthLayoutProps = {
    children: React.ReactNode;
};
const AuthLayout = ({children}: AuthLayoutProps) => {
    return <div className="container relative overflow-hidden mx-auto">{children}</div>;
};

export default AuthLayout;
