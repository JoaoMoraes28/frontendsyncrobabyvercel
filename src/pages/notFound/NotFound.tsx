import { useNavigate } from "react-router-dom";
import { EmptyState } from "../../components/EmptyState";

function NotFound() {
  const navigate = useNavigate();

  return (
    <EmptyState
      isFullPage={true}
      show404Background={true}
      title={
        <>
          Ops! <br /> Cadê a página?
        </>
      }
      description="Parece que essa página foi parar na caixa de brinquedos."
      buttonText="Página anterior"
      onButtonClick={() => navigate(-1)}
    />
  );
}

export default NotFound;
