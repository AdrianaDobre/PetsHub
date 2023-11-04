USE [Petshub]
GO

/****** Object:  Table [dbo].[User]    Script Date: 04/11/2023 22:43:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[User](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[PhoneNumber] [nvarchar](13) NOT NULL,
	[LocationName] [nvarchar](100) NULL,
	[LocationLatitude] [decimal](12, 10) NULL,
	[LocationLongitude] [decimal](12, 10) NULL,
	[PhotoId] [uniqueidentifier] NULL,
	[IsGoogle] [bit] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
	[GoogleId] [nvarchar](500) NULL,
	[HashedPassword] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_UserPhoto] FOREIGN KEY([PhotoId])
REFERENCES [dbo].[Photo] ([Id])
GO

ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_UserPhoto]
GO


