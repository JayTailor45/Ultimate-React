import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout as logoutApi } from "../../services/apiAuth.js";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: (data) => {
      queryClient.removeQueries(["user"]);
      toast.success("Logout successful");
      navigate("/login", { replace: true });
    },
    onError: (error) => toast.error(`${error.message}: ${error.cause.message}`),
});

  return { logout, isLoading };
}
