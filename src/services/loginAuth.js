import api from "./api";

const loginAuth = async (email, password) => {
    try {
        const response = await api.post("/auth/login", {
            email,
            password,
        });
        localStorage.setItem("aluno_id", response.data.aluno_id);
        localStorage.setItem("access_token", response.data.access_token);
    } catch (error) {
        throw new Error(error);
    };
};

export default loginAuth;