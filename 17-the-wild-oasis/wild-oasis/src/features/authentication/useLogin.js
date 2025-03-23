import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login as loginApi } from "../../services/apiAuth.js";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueriesData(["user"], data.user);
      toast.success("Login successful");
      navigate("/dashboard");
    },

    onError: (error) => toast.error(`${error.message}: ${error.cause.message}`),
  });

  return { login, isLoading };
};
