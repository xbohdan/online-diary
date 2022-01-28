CREATE TABLE [dbo].[Notes] (
    [NoteId]           INT            IDENTITY (1, 1) NOT NULL,
    [UserId]           NVARCHAR (450) NOT NULL,
    [Heading]          NVARCHAR (100) NOT NULL,
    [Content]          NVARCHAR (MAX) NOT NULL,
    [InitialDate]      DATE           NOT NULL,
    [ModificationDate] DATE           NULL,
    CONSTRAINT [PK_Note] PRIMARY KEY CLUSTERED ([NoteId] ASC),
    CONSTRAINT [FK_Note_AspNetUsers] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]),
    CONSTRAINT [AK_Note] UNIQUE ([UserId], [InitialDate])
);

