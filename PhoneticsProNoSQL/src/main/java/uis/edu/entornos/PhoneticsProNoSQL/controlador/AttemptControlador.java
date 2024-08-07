/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package uis.edu.entornos.PhoneticsProNoSQL.controlador;

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
import uis.edu.entornos.PhoneticsProNoSQL.modelo.Attempt;
import uis.edu.entornos.PhoneticsProNoSQL.servicio.AttemptServicio;

 //Swagger
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/Attempt")
@Api(value = "Registro de intentos", tags={"Intentos"})  // Swagger
public class AttemptControlador {
    
    @Autowired
    AttemptServicio attemptServicio;
    
    //Listar
    @ApiOperation(value = "Ver lista de intentos", response = List.class)
    @GetMapping("/list")
    public List<Attempt> listarAttempt(){
        return attemptServicio.getAttempts();
    }
    
    
    //Buscar por ID
    @ApiOperation(value="Obtener un intento por el ID", response = Attempt.class)
    @GetMapping("/list/{id}")
    public Attempt buscarPorId(@PathVariable String id){
        return attemptServicio.getAttemptById(id);
    }
    
    //Crear
    @ApiOperation(value="Crear un nuevo intento", response = Attempt.class)
    @PostMapping("/")
    public ResponseEntity<Attempt> agregar(@RequestBody Attempt attempt){
        Attempt obj = attemptServicio.createAttempt(attempt);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    //Actualizar
    @ApiOperation(value = "Actualizar un intento existente", response = Attempt.class)
    @PutMapping("/")
    public ResponseEntity<Attempt> actualizar(@RequestBody Attempt attempt){
        Attempt obj = attemptServicio.getAttemptById(attempt.getId());
        if(obj != null){
            obj.setCorrect_attempt(attempt.getCorrect_attempt());
            obj.setDate_attempt(attempt.getDate_attempt());
            obj.setTotal_attempt(attempt.getTotal_attempt());
            attemptServicio.createAttempt(obj);
        } else{
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
    
    //Borrar
    @ApiOperation(value = "Borrar un intento por su ID", response = ResponseEntity.class)
    @DeleteMapping("/{id}")
    public ResponseEntity<Attempt> borrar(@PathVariable String id){
        Attempt obj = attemptServicio.getAttemptById(id);
        if(obj != null){
            attemptServicio.deleteAttempt(id);
        } else{
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
        
    }
    
}