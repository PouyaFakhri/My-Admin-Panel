import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../services/config";


export const UseRegisterUser = () => {
    const registerUser = (formData) => {
        return api.post("/auth/register", formData)
    }
    return useMutation({
        mutationKey: ["usersRegister"],
        mutationFn: registerUser
    })
}

export const UseUserLogin = () => {
    const userLogin = (loginData) => {
        return api.post("/auth/login", loginData)
    }
    return useMutation({
        mutationKey : ["usersLogin"] ,
        mutationFn : userLogin
    })
}

export const UseProducts = ({page = 1 , limit = 10 , name = ""}) => {
    const GetProducter =  () => api.get(`products?page=${page}&limit=${limit}&name=${encodeURIComponent(name)}`)
    return useQuery({
        queryKey : ["products" , name  , page , limit],
        queryFn : GetProducter ,
        keepPreviousData: true
    })
}

export const UseAddProduct = () => {
    const addProduct = (obj) => {
        return api.post("/products" , obj)
    }
    return useMutation({
        mutationKey : ["addproduct"], 
        mutationFn : addProduct
    })
}

export const UseEditProduct = () => {
    const editProduct = ({id , data}) => {
        return api.put(`/products/${id}` , data)
    }
    return useMutation({
        mutationKey : ["editProduct"], 
        mutationFn : editProduct
    })
}

export const UseDeleteProduct =  () => {
    const deleteProduct = (id) => {
        return api.delete(`/products/${id}`)
    }
    return useMutation({
        mutationKey : ["deleteProduct"],
        mutationFn : deleteProduct
    })
}




