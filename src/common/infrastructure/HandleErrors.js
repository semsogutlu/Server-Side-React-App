const HandleErrors = (response) => {
    if (!response.ok) {
        window.location.href = '/Error';
        return response;
    } 
    return response;
 };

 export default HandleErrors;