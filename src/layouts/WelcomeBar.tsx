import Logo from "../assets/logoAside.svg";

function WelcomeBar() {
  return (
    <aside
      className="hidden xl:fixed xl:flex xl:flex-col xl:items-center xl:w-1/3 xl:min-w-130 xl:h-screen 
        xl:pt-16 xl:bg-primary xl:space-y-2"
    >
      <img
        src={Logo}
        alt="Logo principal. Uma mãe segurando seu filho no colo."
        className="xl:w-82 xl:h-auto"
      />
      <span className="xl:w-2/3 xl:text-[3.1rem] xl:text-text-primary xl:font-semibold">
        BEM-VINDO
      </span>
      <p className="xl:w-2/3 text-text-welcome xl:text-[1.8rem]">
        Conectando você a cada pequeno momento.
      </p>
    </aside>
  );
}

export default WelcomeBar;
