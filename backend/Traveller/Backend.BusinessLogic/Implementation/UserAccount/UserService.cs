﻿using BusinessLogic.Base;
using BusinessLogic.Implementation.UserAccount.Models;
using Common.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;
using Common.DTOs;
using Common.ValidationExtensions;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Http;
using AutoMapper;

namespace BusinessLogic.Implementation.UserAccount
{
    public class UserService : BaseService, UserServiceInterface
    {
        public UserService(ServiceDependencies serviceDependencies) : base(serviceDependencies)
        {
        }
       
        public string HashPassword(string password)
        {
            var sha256 = SHA256.Create();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
        }

        public async Task RegisterNewUser(RegisterModel registerModel)
        {

            var user = new User()
            {
                Id = Guid.NewGuid(),
                Email = registerModel.Email,
                PhoneNumber = registerModel.PhoneNumber,
                Name = registerModel.Name,
                HashedPassword = HashPassword(registerModel.Password),
                IsDeleted = false,
                IsGoogle = false,
            };


            UnitOfWork.Users.Insert(user);

            await UnitOfWork.SaveChangesAsync();
        }

        public async Task<CurrentUserDTO> Login(LogInModel model)
        {

            var user = await UnitOfWork.Users
                .Get()
                .Where(u => u.Email == model.Email  && !u.IsDeleted)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return new CurrentUserDTO { IsAuthenticated = false };
            }

            var passwordHash = HashPassword(model.Password);

            if (passwordHash == user.HashedPassword)
            {
                return new CurrentUserDTO
                {
                    Id = user.Id,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Name = user.Name,
                    IsAuthenticated = true,
                };
            }
            else
            {
                return new CurrentUserDTO { IsAuthenticated = false };
            }
        }

        public async Task<List<PetSitterDetailsModel>> GetAllPetSitters()
        {
            return await Mapper.ProjectTo<PetSitterDetailsModel>(UnitOfWork.Listings.Get().Include(l => l.CreatorUser).Where(l => l.Type == false)).ToListAsync();
        }

        public async Task<UserProfileModel> GetUserProfile()
        {
            return Mapper.Map<UserProfileModel>(await UnitOfWork.Users.Get().Include(l => l.Photo).Where(l => l.Id == CurrentUser.Id).FirstOrDefaultAsync());
        }

        public async Task EditUserProfile(EditProfileModel editUserProfile)
        {
            if (editUserProfile == null || editUserProfile.Email == "" || editUserProfile.Email == null)
            {
                throw new Exception("Must enter an email");
            }

            if (string.IsNullOrEmpty(editUserProfile.Name))
            {
                throw new Exception("Name field is required");
            }

            if (!editUserProfile.Email.Contains("@"))
            {
                throw new Exception("Invalid email format");
            }

            var userInDb = await UnitOfWork.Users.Get().Where(l => l.Id == CurrentUser.Id).FirstOrDefaultAsync();

            if (userInDb == null)
            {
                throw new Exception("The user doesn't exists");
            }

            userInDb.Name = editUserProfile.Name;
            userInDb.Email = editUserProfile.Email;
            userInDb.PhoneNumber = editUserProfile.PhoneNumber;
            userInDb.LocationName = editUserProfile.LocationName;
            userInDb.LocationLatitude = editUserProfile.LocationLatitude;
            userInDb.LocationLongitude = editUserProfile.LocationLongitude;
            userInDb.PhotoId = editUserProfile.PhotoId;

            UnitOfWork.Users.Update(userInDb);

            await UnitOfWork.SaveChangesAsync();
        }

        public async Task<PetSitterProfileModel> GetPetSitterProfileById(Guid id)
        {
            return Mapper.Map<PetSitterProfileModel>(await UnitOfWork.Users.Get().Include(l => l.Photo).Where(l => l.Id == id).FirstOrDefaultAsync());
        }

        public async Task AddLocationOnUserProfile(AddLocationForProfileModel locationModel)
        {
            var userInDb = await UnitOfWork.Users.Get().Where(l => l.Id == CurrentUser.Id).FirstOrDefaultAsync();

            if (userInDb == null)
            {
                throw new Exception("The user doesn't exists");
            }

            userInDb.LocationName = locationModel.LocationName;
            userInDb.LocationLatitude = locationModel.LocationLatitude;
            userInDb.LocationLongitude = locationModel.LocationLongitude;

            UnitOfWork.Users.Update(userInDb);

            await UnitOfWork.SaveChangesAsync();
        }
    }
}
