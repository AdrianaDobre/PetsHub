using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using DataAccess.Entities;

namespace DataAccess.Context
{
    public partial class PetsHubContext : DbContext
    {
        public PetsHubContext()
        {
        }

        public PetsHubContext(DbContextOptions<PetsHubContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Listing> Listings { get; set; } = null!;
        public virtual DbSet<Pet> Pets { get; set; } = null!;
        public virtual DbSet<Photo> Photos { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(local);Initial Catalog=PetsHub;Integrated Security=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Listing>(entity =>
            {
                entity.ToTable("Listing");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

                entity.HasOne(d => d.AcceptedUser)
                    .WithMany(p => p.ListingAcceptedUsers)
                    .HasForeignKey(d => d.AcceptedUserId)
                    .HasConstraintName("FK_ListingAcceptedUser");

                entity.HasOne(d => d.CreatorUser)
                    .WithMany(p => p.ListingCreatorUsers)
                    .HasForeignKey(d => d.CreatorUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ListingCreatorUser");

                entity.HasOne(d => d.Pet)
                    .WithMany(p => p.Listings)
                    .HasForeignKey(d => d.PetId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ListingPet");

                entity.HasOne(d => d.PetPhoto)
                    .WithMany(p => p.Listings)
                    .HasForeignKey(d => d.PetPhotoId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ListingPhoto");
            });

            modelBuilder.Entity<Pet>(entity =>
            {
                entity.ToTable("Pet");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Pet1)
                    .HasMaxLength(50)
                    .HasColumnName("Pet");
            });

            modelBuilder.Entity<Photo>(entity =>
            {
                entity.ToTable("Photo");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Path).HasMaxLength(500);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.GoogleId).HasMaxLength(500);

                entity.Property(e => e.HashedPassword).HasMaxLength(256);

                entity.Property(e => e.LocationLatitude).HasColumnType("decimal(12, 10)");

                entity.Property(e => e.LocationLongitude).HasColumnType("decimal(12, 10)");

                entity.Property(e => e.LocationName).HasMaxLength(100);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.PhoneNumber).HasMaxLength(13);

                entity.HasOne(d => d.Photo)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.PhotoId)
                    .HasConstraintName("FK_UserPhoto");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
