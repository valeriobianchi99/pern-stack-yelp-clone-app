const errorInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.response.use((response) => {
        if (response.config.method !== 'get') {
            window.alert('Operazione avvenuta con successo')
        }
        return response
    }, (error) => {
        window.alert(error.message)
    });
};
export default errorInterceptor;