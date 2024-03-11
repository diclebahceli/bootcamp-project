using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using socialMedia.Domain;


namespace socialMedia.Persistence.Configurations
{
    public class TeamConfiguration : IEntityTypeConfiguration<Team>
    {
        public void Configure(EntityTypeBuilder<Team> builder)
        {


            builder.HasMany(t => t.Posts)
                .WithOne(p => p.Team)
                .HasForeignKey(p => p.TeamId);
        }
    }
}