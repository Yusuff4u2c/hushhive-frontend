export default async function register(data) {
  const response = await axiosInstance.post("/register", data);
  return response.data;
}

// export default async function logIn(us) {
//   const response = await axiosInstance.post("/login", {
//     username: "admin",
//     password: "admin",
//   });
// }
