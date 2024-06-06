using System.Text.Json;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any()) {
                var users = new List<AppUser>{
                    new AppUser{DisplayName = "Test", UserName = "test", Email = "test@test.com"}
                };

                foreach (var user in users) {
                    await userManager.CreateAsync(user, "Passw0rd");
                }
            }
            
            if (!context.Items.Any())
            {
                var items = new List<Item>{
                    // ABDOMINAL CORSETS
                    new() {
                        Name = "Abdominal binder",
                        Description = "A supportive garment worn around the abdomen to provide compression and support following abdominal surgery or injury.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Abdominal Corsets",
                        Images = new List<Photo>{
                            new() {
                                Id= "nae4jvgjog6uswrmfuf01",
                                Url= "https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683746/abdominal_binder_uuxu3w.jpg"
                            },
                        },
                        Price = 19.99,
                        PriceSale = 17.99,
                    },
                    new() {
                        Name = "Maternity support belt",
                        Description = "Provides support for the abdomen and lower back during pregnancy to relieve discomfort and promote proper posture.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Female"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Abdominal Corsets",
                        Images = new List<Photo>{
                            new() {
                                Id= "nae4jvgjog6uswrmfuf02",
                                Url= "https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683762/maternity_support_belt_p4wggn.jpg"
                            },
                        },
                        Price = 19.99,
                        PriceSale = 16.99,
                    },
                    new() {
                        Name = "Postpartum belly wrap",
                        Description = "A wrap-around garment worn by postpartum women to support abdominal muscles, reduce swelling, and aid in recovery after childbirth.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Abdominal Corsets",
                        Images = new List<Photo>{
                            new() {
                                Id= "nae4jvgjog6uswrmfuf04",
                                Url= "https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683772/Postpartum_belly_wrap_s9rlj9.jpg"
                            },
                        },
                        Price = 29.99,
                    },
                    new() {
                        Name = "Abdominal hernia belt",
                        Description = "Designed to support and hold in place herniated or protruding abdominal tissues, providing relief and preventing further strain.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Abdominal Corsets",
                        Images = new List<Photo>{
                            new() {
                                Id= "nae4jvgjog6uswrmfuf03",
                                Url= "https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683746/Abdominal_hernia_belt_mgvikl.jpg"
                            },
                        },
                        Price = 32.99,
                        PriceSale = 31.99,
                    },
                    new() {
                        Name = "Lumbar support belt",
                        Description = "Specifically designed to support the lower back (lumbar region) to alleviate pain and promote proper posture",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Abdominal Corsets",
                        Images = new List<Photo>{
                            new() {
                                Id= "nae4jvgjog6uswrmfuf05",
                                Url= "https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683761/Lumbar_support_belt_v2t0xk.jpg"
                            },
                        },
                        Price = 40.99,
                    },
                    // Ankle and Foot Bandages
                    new() {
                        Name = "Ankle brace",
                        Description = "Supports and stabilizes the ankle joint to prevent or treat injuries such as sprains or strains.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Ankle and Foot Bandages",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t41",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683748/Ankle_brace_wrggac.jpg"
                            }
                        },
                        Price = 13.99,
                    },
                    new() {
                        Name = "Compression socks",
                        Description = "Elastic garments worn around the foot and lower leg to improve blood circulation and reduce swelling, commonly used for conditions like edema or varicose veins.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Ankle and Foot Bandages",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t42",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683755/Compression_socks_mgigwi.jpg"
                            }
                        },
                        Price = 12.99,
                    },
                    new() {
                        Name = "Plantar fasciitis night splint",
                        Description = "A splint worn while sleeping to stretch the plantar fascia ligament, relieving pain and discomfort associated with plantar fasciitis.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Ankle and Foot Bandages",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t43",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683770/Plantar_fasciitis_night_splint_n2bdgm.jpg"
                            }
                        },
                        Price = 28.99,
                    },
                    new() {
                        Name = "Achilles tendon strap",
                        Description = "Wraps around the ankle and provides targeted compression to the Achilles tendon, aiding in pain relief and promoting healing.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Ankle and Foot Bandages",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t44",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683747/Achilles_tendon_strap_fgfuhr.jpg"
                            }
                        },
                        Price = 14.99,
                    },
                    new() {
                        Name = "Arch support inserts",
                        Description = "Inserts placed inside shoes to provide additional support to the arch of the foot, relieving pain associated with conditions like flat feet or plantar fasciitis.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Ankle and Foot Bandages",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t4234",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683749/Arch_support_inserts_nqthtw.jpg"
                            }
                        },
                        Price = 45.99,
                        PriceSale = 41.99
                    },
                    // Bandages for Shoulder and Elbow Joints
                    new() {
                        Name = "Shoulder immobilizer",
                        Description = "Limits movement of the shoulder joint to promote healing after injury or surgery.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Bandages for Shoulder and Elbow Joints",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t45",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683773/Shoulder_immobilizer_jjikyr.jpg"
                            }
                        },
                        Price = 34.99,
                    },
                    new() {
                        Name = "Elbow brace",
                        Description = "Supports and stabilizes the elbow joint, commonly used for conditions like tennis elbow or golfer's elbow.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Bandages for Shoulder and Elbow Joints",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t46",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683756/Elbow_brace_a3ccee.jpg"
                            }
                        },
                        Price = 27.99,
                    },
                    new() {
                        Name = "Tennis elbow strap",
                        Description = "Applies targeted pressure to the tendons of the forearm to relieve pain associated with tennis elbow (lateral epicondylitis).",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Bandages for Shoulder and Elbow Joints",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t47",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683776/Tennis_elbow_strap_k67h2r.jpg"
                            }
                        },
                        Price = 19.99,
                    },
                    new() {
                        Name = "Rotator cuff support",
                        Description = "Provides compression and support to the rotator cuff muscles and tendons, aiding in injury prevention and rehabilitation.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Bandages for Shoulder and Elbow Joints",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t48",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683772/Rotator_cuff_support_rduxwk.jpg"
                            }
                        },
                        Price = 17.99,
                    },
                    new() {
                        Name = "Shoulder stability brace",
                        Description = "Supports and stabilizes the shoulder joint, commonly used for conditions like shoulder instability or dislocation.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Bandages for Shoulder and Elbow Joints",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t49",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683774/Shoulder_stability_brace_wwpvbj.jpg"
                            }
                        },
                        Price = 24.99,
                        PriceSale = 22.99,
                    },
                    // Arm Bandages and Splints
                    new() {
                        Name = "Arm sling",
                        Description = "Supports and immobilizes the arm to promote healing after injury or surgery.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Arm Bandages and Splints",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t410",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683750/Arm_sling_vlp9bu.jpg"
                            }
                        },
                        Price = 31.99,
                    },
                    new() {
                        Name = "Forearm splint",
                        Description = "Provides support and immobilization for the forearm and wrist, often used for conditions like forearm fractures or repetitive strain injuries.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Arm Bandages and Splints",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t411",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683758/Forearm_splint_zanhxj.jpg"
                            }
                        },
                        Price = 32.99,
                    },
                    new() {
                        Name = "Tennis elbow brace",
                        Description = "Similar to an elbow brace but specifically designed to provide targeted support for tennis elbow (lateral epicondylitis).",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Arm Bandages and Splints",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t412",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683775/Tennis_elbow_brace_hward6.jpg"
                            }
                        },
                        Price = 33.99,
                    },
                    new() {
                        Name = "Wrist support brace",
                        Description = "Supports and stabilizes the wrist joint, commonly used for conditions like carpal tunnel syndrome or wrist sprains.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Arm Bandages and Splints",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t413",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683777/Wrist_support_brace_y3nn5m.jpg"
                            }
                        },
                        Price = 18.99,
                    },
                    new() {
                        Name = "Carpal tunnel splint",
                        Description = "Worn at night to keep the wrist in a neutral position and relieve pressure on the median nerve, reducing symptoms of carpal tunnel syndrome.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Arm Bandages and Splints",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t414",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683751/Carpal_tunnel_splint_s1khgs.jpg"
                            }
                        },
                        Price = 190.99,
                        PriceSale = 175.99,
                    },
                    // Children's Orthopedic Products
                    new() {
                        Name = "Pediatric knee brace",
                        Description = "Provides support and stabilization for the knee joint in children, commonly used for conditions like ligament injuries or juvenile arthritis.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Children's Orthopedic Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t415",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683768/Pediatric_knee_brace_vfjs4u.jpg"
                            }
                        },
                        Price = 31.99,
                    },
                    new() {
                        Name = "Child-size ankle brace",
                        Description = "Similar to an adult ankle brace but designed to fit children's smaller ankles, providing support and stability.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Children's Orthopedic Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t416",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683752/Child-size_ankle_brace_n8chlw.jpg"
                            }
                        },
                        Price = 27.99,
                    },
                    new() {
                        Name = "Pediatric wrist splint",
                        Description = "Supports and immobilizes the wrist in children, commonly used for conditions like wrist fractures or sprains.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Children's Orthopedic Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t417",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683770/Pediatric_wrist_splint_zcgww9.jpg"
                            }
                        },
                        Price = 79.99,
                    },
                    new() {
                        Name = "Kids' posture corrector",
                        Description = "Helps children maintain proper posture by providing support to the back and shoulders, reducing strain and discomfort.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Children's Orthopedic Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t418",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683760/Kids_posture_corrector_mcfmbz.jpg"
                            }
                        },
                        Price = 67.99,
                    },
                    new() {
                        Name = "Pediatric arm sling",
                        Description = "Similar to an adult arm sling but sized to fit children, providing support and immobilization for arm injuries.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Children's Orthopedic Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t419",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683768/Pediatric_arm_sling_eglfln.jpg"
                            }
                        },
                        Price = 15.99,
                    },
                    // Elastic Bandages and Other Products
                    new() {
                        Name = "Compression bandage",
                        Description = "Elastic bandage used to apply compression to a body part to reduce swelling and provide support, commonly used for sprains or strains.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Elastic Bandages and Other Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t420",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683754/Compression_bandage_yqtbat.jpg"
                            }
                        },
                        Price = 13.99,
                    },
                    new() {
                        Name = "Kinesiology tape",
                        Description = "Elastic tape applied to the skin to provide support to muscles and joints, aid in rehabilitation, and reduce pain.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Elastic Bandages and Other Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t421",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683760/Kinesiology_tape_nghxft.jpg"
                            }
                        },
                        Price = 10.99,
                    },
                    new() {
                        Name = "Cohesive bandage wrap",
                        Description = "Self-adhering bandage wrap that sticks to itself but not to skin or hair, commonly used for securing dressings or providing compression.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Elastic Bandages and Other Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t422",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683753/Cohesive_bandage_wrap_etxzg0.jpg"
                            }
                        },
                        Price = 11.99,
                    },
                    new() {
                        Name = "Elastic wrist wrap",
                        Description = "Wraps around the wrist to provide compression and support, commonly used for conditions like wrist sprains or arthritis.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Elastic Bandages and Other Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t423",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683756/Elastic_wrist_wrap_kfsqzt.jpg"
                            }
                        },
                        Price = 19.99,
                    },
                    new() {
                        Name = "Finger splint",
                        Description = "Immobilizes and supports injured fingers or thumbs to promote healing, commonly used for fractures or ligament injuries.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Elastic Bandages and Other Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t424",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683758/Finger_splint_wbtqgs.jpg"
                            }
                        },
                        Price = 23.99,
                    },
                    // Nexus Adjustable Compression Products
                    new() {
                        Name = "Nexus Adjustable Compression Knee Sleeve",
                        Description = "Provides adjustable compression and support to the knee joint, aiding in injury prevention and rehabilitation.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Nexus Adjustable Compression Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t425",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683766/Nexus_Adjustable_Compression_Knee_Sleeve_kbztj6.jpg"
                            }
                        },
                        Price = 56.99,
                        PriceSale = 54.99,
                    },
                    new() {
                        Name = "Nexus Adjustable Compression Elbow Brace",
                        Description = "Offers customizable compression and support for the elbow joint, commonly used for conditions like tendonitis or arthritis.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Nexus Adjustable Compression Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t426",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683765/Nexus_Adjustable_Compression_Elbow_Brace_fye4zb.jpg"
                            }
                        },
                        Price = 47.99,
                    },
                    new() {
                        Name = "Nexus Adjustable Compression Ankle Support",
                        Description = "Adjustable compression support for the ankle joint, aiding in stability and injury prevention.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Nexus Adjustable Compression Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t427",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683763/Nexus_Adjustable_Compression_Ankle_Support_sfypic.jpg"
                            }
                        },
                        Price = 39.99,
                    },
                    new() {
                        Name = "Nexus Adjustable Compression Wrist Wrap",
                        Description = "Provides adjustable compression and support to the wrist joint, commonly used for conditions like carpal tunnel syndrome or wrist sprains.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Nexus Adjustable Compression Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t428",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683767/Nexus_Adjustable_Compression_Wrist_Wrap_me64hs.jpg"
                            }
                        },
                        Price = 41.99,
                        PriceSale = 38.99,
                    },
                    new() {
                        Name = "Nexus Adjustable Compression Calf Sleeve",
                        Description = "Offers adjustable compression for the calf muscles, aiding in muscle recovery and reducing fatigue.",
                        Details = JsonSerializer.Serialize(new {
                            Material = new List<string>{"Cotton", "Plastic"},
                            Country = "Ukraine"
                        }),
                        Sizes = new List<string>{"Universal"},
                        Colors = new List<string>{ "Black", "White", "Blue"},
                        Genders = new List<string>{ "Universal"},
                        CompressionClasses = new List<string>{ "Without", "1st", "2nd"},
                        Category = "Nexus Adjustable Compression Products",
                        Images = new List<Photo>{
                            new() {
                                Id="bf3azbrsdrpdcl2fd4t429",
                                Url="https://res.cloudinary.com/dhlhcn9vy/image/upload/v1717683764/Nexus_Adjustable_Compression_Calf_Sleeve_ks0qht.jpg"
                            }
                        },
                        Price = 51.99,
                    },
                };
                await context.Items.AddRangeAsync(items);
                await context.SaveChangesAsync();
            }
        }
    }
}