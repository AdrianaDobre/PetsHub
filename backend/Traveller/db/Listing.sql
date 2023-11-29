USE [Petshub]
GO

/****** Object:  Table [dbo].[Listing]    Script Date: 06/11/2023 23:12:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Listing](
	[Id] [uniqueidentifier] NOT NULL,
	[CreatorUserId] [uniqueidentifier] NOT NULL,
	[AcceptedUserId] [uniqueidentifier] NULL,
	[PetId] [smallint] NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[Status] INT NOT NULL,
	[PetPhotoId] [uniqueidentifier] NULL,
	[Date] [datetime] NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[Time] [int] NOT NULL,
	[Type] [bit] NOT NULL,
	[Title] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Listing] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Listing]  WITH CHECK ADD  CONSTRAINT [FK_ListingAcceptedUser] FOREIGN KEY([AcceptedUserId])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Listing] CHECK CONSTRAINT [FK_ListingAcceptedUser]
GO

ALTER TABLE [dbo].[Listing]  WITH CHECK ADD  CONSTRAINT [FK_ListingCreatorUser] FOREIGN KEY([CreatorUserId])
REFERENCES [dbo].[User] ([Id])
GO

ALTER TABLE [dbo].[Listing] CHECK CONSTRAINT [FK_ListingCreatorUser]
GO

ALTER TABLE [dbo].[Listing]  WITH CHECK ADD  CONSTRAINT [FK_ListingPet] FOREIGN KEY([PetId])
REFERENCES [dbo].[Pet] ([Id])
GO

ALTER TABLE [dbo].[Listing] CHECK CONSTRAINT [FK_ListingPet]
GO

ALTER TABLE [dbo].[Listing]  WITH CHECK ADD  CONSTRAINT [FK_ListingPhoto] FOREIGN KEY([PetPhotoId])
REFERENCES [dbo].[Photo] ([Id])
GO

ALTER TABLE [dbo].[Listing] CHECK CONSTRAINT [FK_ListingPhoto]
GO


