using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using socialMedia.Domain;

namespace socialMedia.Persistence;

public class LikeConfiguration : IEntityTypeConfiguration<Like>
{
    public void Configure(EntityTypeBuilder<Like> builder)
    {
        builder.HasOne(l => l.User).WithMany(u => u.Likes).HasForeignKey(l => l.UserId);

        builder.HasOne(l => l.Post).WithMany(p => p.Likes).HasForeignKey(l => l.PostId);
    }
}
