package com.bestmovies.sep6_project.services;

import com.bestmovies.sep6_project.Utils.HashUtil;
import com.bestmovies.sep6_project.dao.interfaces.IUserMapper;
import com.bestmovies.sep6_project.model.User.User;
import com.bestmovies.sep6_project.services.enums.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Arrays;

@Component
public class UserService {

    @Autowired
    private HashUtil hashUtil;

    @Autowired
    private IUserMapper userMapper;

    public ResponseMessage loginUser(User user) throws NoSuchAlgorithmException, InvalidKeySpecException {
        if(user != null){
            if(user.getUserName() != null){
                User dbUser = userMapper.getUserByUsername(user);
                if(Arrays.equals(hashUtil.hash(user.getPassword(), dbUser.getHashedPassword().getSalt()).getHashedString(),
                        dbUser.getHashedPassword().getHashedString())){
                    return ResponseMessage.SUCCESS;
                }
                else{
                    return ResponseMessage.WRONG_PASSWORD;
                }
            }
            if(user.getEmail() != null){
                User dbUser = userMapper.getUserByEmail(user);
                if(Arrays.equals(hashUtil.hash(user.getPassword(), dbUser.getHashedPassword().getSalt()).getHashedString(),
                        dbUser.getHashedPassword().getHashedString())){
                    return ResponseMessage.SUCCESS;
                }
                else{
                    return ResponseMessage.WRONG_PASSWORD;
                }
            }
        }
        return ResponseMessage.INTERNAL_ERROR;
    }

    public ResponseMessage registerUser(User user){
        if(user != null){
            if(userMapper.getUserByUsername(user).getUserName().equals(user.getUserName())){
                return ResponseMessage.EXISTING_USER;
            }
            if(userMapper.getUserByEmail(user).getEmail().equals(user.getEmail())){
                return ResponseMessage.EXISTING_USER;
            }
            if(!user.getPassword().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")){
                return ResponseMessage.PASSWORD_ERROR;
            }
            user.setHashedPassword(hashUtil.hash(user.getPassword(),null));
            userMapper.registerUser(user);
            return ResponseMessage.SUCCESS;
        }
        return ResponseMessage.INTERNAL_ERROR;
    }
}