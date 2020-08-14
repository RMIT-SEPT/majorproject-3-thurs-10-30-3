package edu.rmit.gateway.controller;

import edu.rmit.gateway.error.BadRequestException;
import edu.rmit.gateway.error.NotFoundException;
import edu.rmit.gateway.model.CustomErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import java.time.LocalDateTime;

@ControllerAdvice
public class CustomGlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<CustomErrorResponse> springHandleBadRequest(Exception ex){
       CustomErrorResponse errorResponse = new CustomErrorResponse();
       errorResponse.setTimestamp(LocalDateTime.now());
       errorResponse.setStatus(HttpStatus.BAD_REQUEST.value());
       errorResponse.setError(HttpStatus.BAD_REQUEST);
       errorResponse.setMessage(ex.getMessage());

       return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<CustomErrorResponse> springHandleNotFound(Exception ex){
        CustomErrorResponse errorResponse = new CustomErrorResponse();
        errorResponse.setTimestamp(LocalDateTime.now());
        errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
        errorResponse.setError(HttpStatus.NOT_FOUND);
        errorResponse.setMessage(ex.getMessage());

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
}
