using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using socialMedia.Domain;

namespace socialMedia.Persistence;

public class PostConfiguration : IEntityTypeConfiguration<Post>
{

    public void Configure(EntityTypeBuilder<Post> builder)
    {
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Description)
            .IsRequired()
            .HasMaxLength(500);

        builder.Property(e => e.Image)
            .HasMaxLength(500);

        builder.Property(e => e.CreatedDate);


        // builder.HasOne(d => d.Team)
        //     .WithMany(p => p.Posts)
        //     .HasForeignKey(d => d.TeamsId)
        //     .OnDelete(DeleteBehavior.ClientSetNull);

        builder.HasMany(d => d.Comments)
            .WithOne(p => p.Post)
            .HasForeignKey(d => d.PostId)
            .OnDelete(DeleteBehavior.ClientSetNull);
    }
}