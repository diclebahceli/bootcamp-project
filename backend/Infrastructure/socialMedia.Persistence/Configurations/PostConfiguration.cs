using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using socialMedia.Domain;

namespace socialMedia.Persistence;

public class PostConfiguration : IEntityTypeConfiguration<Post>
{

    public void Configure(EntityTypeBuilder<Post> builder)
    {
        
        builder.HasMany(d => d.Comments)
            .WithOne(p => p.Post)
            .HasForeignKey(d => d.PostId)
            .OnDelete(DeleteBehavior.ClientSetNull);
    }
}