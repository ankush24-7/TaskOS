import Logo from "@/components/ui/Logo";

const authHeader = () => {
  return (
    <header className="hidden px-10 pt-5 sm:block sm:fixed">
      <Logo />
    </header>
  );
};

export default authHeader;
