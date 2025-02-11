export const translateStatus = (status) => {
    switch (status) {
        case "PENDING":
            return "Pendiente";
        case "CONFIRMED":
            return "Confirmado";
        case "SHIPPED":
            return "Enviado";
        case "DELIVERED":
            return "Entregado";
        case "CANCELLED":
            return "Cancelado";
        default:
            return status;
    }
};