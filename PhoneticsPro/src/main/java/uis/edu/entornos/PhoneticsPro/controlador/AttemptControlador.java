/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package uis.edu.entornos.PhoneticsPro.controlador;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uis.edu.entornos.PhoneticsPro.modelo.Attempt;
import uis.edu.entornos.PhoneticsPro.servicio.AttemptServicio;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/Attempt")
public class AttemptControlador {
    
    @Autowired
    AttemptServicio attemptServicio;
    
    //Listar
    @GetMapping("/list")
    public List<Attempt> listarAttempt(){
        return attemptServicio.getAttempt();
    }
    
    
    //Buscar por ID
    @GetMapping("/list/{id}")
    public Attempt buscarPorId(@PathVariable Long id){
        return attemptServicio.buscarAttempt(id);
    }
    
    //Crear
    @PostMapping("/")
    public ResponseEntity<Attempt> agregar(@RequestBody Attempt attempt){
        Attempt obj = attemptServicio.nuevoAttempt(attempt);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    //Actualizar
    @PutMapping("/")
    public ResponseEntity<Attempt> actualizar(@RequestBody Attempt attempt){
        Attempt obj = attemptServicio.buscarAttempt(attempt.getId_attempt());
        if(obj != null){
            obj.setCorrect_attempt(attempt.getCorrect_attempt());
            obj.setDate_attempt(attempt.getDate_attempt());
            obj.setTotal_attempt(attempt.getTotal_attempt());
            attemptServicio.nuevoAttempt(obj);
        } else{
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    //Borrar
    @DeleteMapping("/{id}")
    public ResponseEntity<Attempt> borrar(@PathVariable Long id){
        Attempt obj = attemptServicio.buscarAttempt(id);
        if(obj != null){
            attemptServicio.borrarAttempt(id);
        } else{
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
        
    }
    
}
