/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package uis.edu.entornos.PhoneticsPro.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import uis.edu.entornos.PhoneticsPro.modelo.Users;

/**
 *
 * @author Carlos
 */

public interface UsersRepositorio extends JpaRepository<Users, Long>{
    
}
