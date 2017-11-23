using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace reactTwo.Migrations
{
    public partial class InitialWebshopDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    AdminId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    achterNaam = table.Column<string>(nullable: true),
                    functie = table.Column<string>(nullable: true),
                    mail = table.Column<string>(nullable: true),
                    tussenVoegsel = table.Column<string>(nullable: true),
                    voorNaam = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.AdminId);
                });

            migrationBuilder.CreateTable(
                name: "Bestellingen",
                columns: table => new
                {
                    BestellingId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    bestellingDatum = table.Column<DateTime>(nullable: false),
                    klantId = table.Column<int>(nullable: false),
                    productId = table.Column<int>(nullable: false),
                    status = table.Column<string>(nullable: true),
                    verstuurDatum = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bestellingen", x => x.BestellingId);
                });

            migrationBuilder.CreateTable(
                name: "Betalingen",
                columns: table => new
                {
                    BetalingId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    bedrag = table.Column<decimal>(nullable: false),
                    betalingsDatum = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Betalingen", x => x.BetalingId);
                });

            migrationBuilder.CreateTable(
                name: "Klanten",
                columns: table => new
                {
                    KlantId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    klantAchternaam = table.Column<string>(nullable: true),
                    klantMail = table.Column<string>(nullable: true),
                    klantNaam = table.Column<string>(nullable: true),
                    klantPostcode = table.Column<string>(nullable: true),
                    klantStraat = table.Column<string>(nullable: true),
                    klantStraatnmr = table.Column<string>(nullable: true),
                    klantTel = table.Column<int>(nullable: false),
                    klantTussenvoegsel = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klanten", x => x.KlantId);
                });

            migrationBuilder.CreateTable(
                name: "Producten",
                columns: table => new
                {
                    ProductId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    aantalInVooraad = table.Column<int>(nullable: false),
                    consoleType = table.Column<string>(nullable: true),
                    productGenre = table.Column<string>(nullable: true),
                    productImg = table.Column<string>(nullable: true),
                    productNaam = table.Column<string>(nullable: true),
                    productOmschr = table.Column<string>(nullable: true),
                    productOntwikkelaar = table.Column<string>(nullable: true),
                    productPrijs = table.Column<decimal>(nullable: false),
                    productType = table.Column<string>(nullable: true),
                    productUitgever = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Producten", x => x.ProductId);
                });

            migrationBuilder.CreateTable(
                name: "Wenslijsten",
                columns: table => new
                {
                    WenslijstId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    KlantId = table.Column<int>(nullable: false),
                    productNmr = table.Column<int>(nullable: false),
                    toevoegDatum = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wenslijsten", x => x.WenslijstId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Bestellingen");

            migrationBuilder.DropTable(
                name: "Betalingen");

            migrationBuilder.DropTable(
                name: "Klanten");

            migrationBuilder.DropTable(
                name: "Producten");

            migrationBuilder.DropTable(
                name: "Wenslijsten");
        }
    }
}
