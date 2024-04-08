/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package uis.edu.entornos.PhoneticsPro.servicio;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uis.edu.entornos.PhoneticsPro.modelo.Users;
import uis.edu.entornos.PhoneticsPro.repositorio.UsersRepositorio;


@Service
@Transactional
public class UsersServicio implements IUsersServicio {
    
    @Autowired
    UsersRepositorio usersRepositorio;
    
    
    // Listar 
    @Override
    public List<Users> getUser(){
        return usersRepositorio.findAll();
    }
    
    // Crear
    @Override
    public Users nuevoUser(Users user){
        return usersRepositorio.save(user);
    }
    
    // Buscar
    @Override
    public Users buscarUser(Long id){
        Users user = null;
        user = usersRepositorio.findById(id).orElse(null);
        if(user == null){
            return null;
        }
        return user;
    }
    
    // Borrar
    @Override
    public int borrarUser(Long id){
        usersRepositorio.deleteById(id);
        return 1;
    }
    
}
