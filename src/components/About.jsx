import React from 'react';
import { Award, Shield, Target, Users } from 'lucide-react';

const features = [
    { icon: Shield, title: 'Builder Neutral', description: 'Completely unbiased advice with no builder partnerships or conflicts of interest.' },
    { icon: Users, title: 'Zero Commission', description: 'No hidden fees or commissions. Our transparent pricing ensures you save money.' },
    { icon: Award, title: 'Expert Advisory', description: 'Years of experience in Bengaluru real estate market with deep local knowledge.' },
    { icon: Target, title: 'Perfect Match', description: 'Personalized property recommendations based on your exact requirements and budget.' },
];

const About = () => {
    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-6 mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary">
                            About <span className="bg-gradient-gold bg-clip-text text-transparent">Brickloop Advisors</span>
                        </h2>
                        <div className="w-32 h-1 bg-gradient-gold mx-auto rounded-full shadow-button"></div>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            As a subsidiary of Hoysala Realtors, we bring decades of real estate expertise with a revolutionary approach - complete builder neutrality and zero commission advisory.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        {features.map((feature, index) => (
                            <div key={index} className="group text-center space-y-4 p-6 rounded-2xl bg-gradient-card shadow-card hover:shadow-luxury transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-button">
                                    <feature.icon className="w-8 h-8 text-accent-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold text-primary">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gradient-card rounded-3xl p-8 md:p-12 shadow-luxury">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h3 className="text-3xl font-bold text-primary">Our Commitment</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    We believe real estate advisory should be transparent, unbiased, and focused solely on your needs. That's why we've eliminated builder partnerships and commissions from our business model.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-gradient-gold rounded-full shadow-sm"></div>
                                        <span className="text-foreground">Comprehensive market research and analysis</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-gradient-gold rounded-full shadow-sm"></div>
                                        <span className="text-foreground">Legal due diligence and documentation support</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-gradient-gold rounded-full shadow-sm"></div>
                                        <span className="text-foreground">Post-purchase assistance and support</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-primary/5 rounded-2xl p-8 text-center">
                                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                                <div className="text-muted-foreground mb-4">Happy Clients</div>
                                <div className="text-4xl font-bold text-primary mb-2">₹500Cr+</div>
                                <div className="text-muted-foreground mb-4">Properties Advised</div>
                                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                                <div className="text-muted-foreground">Years Experience</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;