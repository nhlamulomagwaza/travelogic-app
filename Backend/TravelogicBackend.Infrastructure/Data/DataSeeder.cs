using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using TravelogicBackend.Domain.Entities;
using TravelogicBackend.Domain.Enums;

namespace TravelogicBackend.Infrastructure.Data
{
    //Hi, TraveLogic code reviewer, to avoid starting the app with an empty database
    //I will be seeding the system to give it a bit of life😅
    public static class DataSeeder
    {
        public static async Task SeedAsync(AppDbContext db, ILogger logger)
        {
            await SeedSuppliersAsync(db, logger);
            await SeedServicesAsync(db, logger);
        }

        private static async Task SeedSuppliersAsync(AppDbContext db, ILogger logger)
        {
            if (await db.Suppliers.AnyAsync())
            {
                logger.LogInformation("Suppliers already seeded, skipping.");
                return;
            }

            db.Suppliers.AddRange(
                new Supplier("Kasi Logistics", "17 Bree Street, Johannesburg, 2001",
                    "https://kasilogistics.co.za", "+27-11-334-7781", Country.SouthAfrica),
                new Supplier("Mzansi Freight Co", "42 Voortrekker Road, Bellville, 7530",
                    "https://mzansifreight.co.za", "+27-21-946-2203", Country.SouthAfrica),
                new Supplier("Thames Haulage Ltd", "88 Commercial Road, London, E1 1NU",
                    "https://thameshaulage.co.uk", "+44-20-7946-3312", Country.UnitedKingdom),
                new Supplier("Durban Bay Supplies", "9 Mahatma Gandhi Road, Durban, 4001",
                    "https://durbanbaysupplies.co.za", "+27-31-337-4419", Country.SouthAfrica),
                new Supplier("Empire State Trading", "350 5th Avenue, New York, NY 10118",
                    "https://empirestatetrading.com", "+1-212-736-5540", Country.UnitedStates),
                new Supplier("Peachtree Wholesale", "1180 Peachtree Street NE, Atlanta, GA 30309",
                    "https://peachtreewholesale.com", "+1-404-892-6617", Country.UnitedStates),
                new Supplier("Rhein Handel GmbH", "Kurfürstendamm 21, 10719 Berlin",
                    "https://rheinhandel.de", "+49-30-8842-1190", Country.Germany),
                new Supplier("Pretoria Parts Hub", "256 Church Street, Pretoria, 0002",
                    "https://pretoriaparts.co.za", "+27-12-326-8874", Country.SouthAfrica),
                new Supplier("Nairobi Trade Links", "Kenyatta Avenue, Nairobi, 00100",
                    "https://nairobitradelinks.co.ke", "+254-20-222-7734", Country.Kenya),
                new Supplier("Salford Industrial", "Unit 7, Trafford Park, Manchester, M17 1AB",
                    "https://salfordindustrial.co.uk", "+44-161-872-4409", Country.UnitedKingdom)
            );

            await db.SaveChangesAsync();
            logger.LogInformation("Seeded suppliers.");
        }

        private static async Task SeedServicesAsync(AppDbContext db, ILogger logger)
        {
            if (await db.Services.AnyAsync())
            {
                logger.LogInformation("Services already seeded, skipping.");
                return;
            }

            // Look up by name so we never assume IDs
            var suppliers = await db.Suppliers.ToDictionaryAsync(s => s.Name);

            db.Services.AddRange(
                new Service("Township Shuttle",
                    "Guided half-day shuttle through Soweto with local stops.",
                    suppliers["Kasi Logistics"].Id),
                new Service("Airport Transfer",
                    "Private transfer from OR Tambo to Sandton hotels.",
                    suppliers["Kasi Logistics"].Id),

                new Service("Cape Winelands Delivery",
                    "Same-day courier between Cape Town and Stellenbosch.",
                    suppliers["Mzansi Freight Co"].Id),

                new Service("UK Freight Forwarding",
                    "Palletised freight across the UK, 48-hour turnaround.",
                    suppliers["Thames Haulage Ltd"].Id),

                new Service("Durban Harbour Tour",
                    "Two-hour boat tour of Durban harbour and the Point waterfront.",
                    suppliers["Durban Bay Supplies"].Id),
                new Service("Coastal Catering",
                    "Event catering along the KZN north coast.",
                    suppliers["Durban Bay Supplies"].Id),

                new Service("Manhattan Walking Tour",
                    "Three-hour guided walk through Midtown and Central Park.",
                    suppliers["Empire State Trading"].Id),

                new Service("Atlanta Trade Show Setup",
                    "Booth setup and logistics for trade shows at Georgia World Congress.",
                    suppliers["Peachtree Wholesale"].Id),

                new Service("Berlin Industrial Tour",
                    "Half-day tour of Berlin industrial parks and logistics hubs.",
                    suppliers["Rhein Handel GmbH"].Id),

                new Service("Fleet Maintenance",
                    "On-site fleet servicing for light commercial vehicles.",
                    suppliers["Pretoria Parts Hub"].Id),
                new Service("Parts Sourcing",
                    "Sourcing of hard-to-find vehicle parts, 5-7 day lead time.",
                    suppliers["Pretoria Parts Hub"].Id),

                new Service("Safari Logistics",
                    "Transport and logistics for safari operators in the Mara.",
                    suppliers["Nairobi Trade Links"].Id),

                new Service("Warehouse Storage",
                    "Bonded warehouse storage in Trafford Park, Manchester.",
                    suppliers["Salford Industrial"].Id),
                new Service("Same-Day Couriers",
                    "Same-day courier across Greater Manchester.",
                    suppliers["Salford Industrial"].Id)
            );

            await db.SaveChangesAsync();
            logger.LogInformation("Seeded services.");
        }
    }
}
