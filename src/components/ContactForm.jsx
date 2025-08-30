import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        budget: '',
        location: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name) => (value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically handle form submission, e.g., send data to an API
        toast.success("Thank you for your inquiry!", {
            description: "Our team will contact you within 24 hours.",
        });
        setFormData({
            name: '',
            email: '',
            phone: '',
            propertyType: '',
            budget: '',
            location: '',
            message: '',
        });
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent("Hi Brickloop Advisors, I'm interested in learning more about your real estate services.");
        const url = `https://wa.me/919876543210?text=${message}`;
        window.open(url, '_blank');
    };

    return (
        <section id="contact-form" className="py-20 bg-gradient-card">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-6 mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-primary">
                            Get <span className="bg-gradient-gold bg-clip-text text-transparent">Free Consultation</span>
                        </h2>
                        <div className="w-32 h-1 bg-gradient-gold mx-auto rounded-full shadow-button"></div>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Ready to find your perfect property? Share your requirements and our experts will provide personalized recommendations at zero cost.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <div className="bg-card rounded-2xl p-8 shadow-luxury">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-primary">Full Name *</label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                required
                                                className="h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-primary">Email Address *</label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                required
                                                className="h-12"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="text-sm font-medium text-primary">Phone Number *</label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Enter your phone number"
                                                required
                                                className="h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="propertyType" className="text-sm font-medium text-primary">Property Type</label>
                                            <Select
                                                name="propertyType"
                                                value={formData.propertyType}
                                                onValueChange={handleSelectChange('propertyType')}
                                            >
                                                <SelectTrigger className="h-12">
                                                    <SelectValue placeholder="Select property type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="apartment">Apartment</SelectItem>
                                                    <SelectItem value="villa">Villa</SelectItem>
                                                    <SelectItem value="commercial">Commercial</SelectItem>
                                                    <SelectItem value="plot">Plot</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="budget" className="text-sm font-medium text-primary">Budget Range</label>
                                            <Select
                                                name="budget"
                                                value={formData.budget}
                                                onValueChange={handleSelectChange('budget')}
                                            >
                                                <SelectTrigger className="h-12">
                                                    <SelectValue placeholder="Select budget range" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="50-75">₹50L - ₹75L</SelectItem>
                                                    <SelectItem value="75-100">₹75L - ₹1Cr</SelectItem>
                                                    <SelectItem value="100-150">₹1Cr - ₹1.5Cr</SelectItem>
                                                    <SelectItem value="150+">₹1.5Cr+</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="location" className="text-sm font-medium text-primary">Preferred Location</label>
                                            <Input
                                                id="location"
                                                name="location"
                                                value={formData.location}
                                                onChange={handleChange}
                                                placeholder="e.g., Whitefield, Koramangala"
                                                className="h-12"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-primary">Additional Requirements</label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Tell us more about your requirements..."
                                            rows={4}
                                        />
                                    </div>
                                    <Button type="submit" variant="premium" size="lg" className="w-full text-lg py-4">
                                        Get Free Consultation
                                    </Button>
                                </form>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="bg-card rounded-2xl p-8 shadow-card">
                                <h3 className="text-xl font-semibold text-primary mb-6">Contact Information</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center shadow-button">
                                            <Phone className="w-5 h-5 text-accent-foreground" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-primary">Phone</div>
                                            <div className="text-muted-foreground">+91 98765 43210</div>
                                            <div className="text-muted-foreground">+91 87654 32109</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center shadow-button">
                                            <Mail className="w-5 h-5 text-accent-foreground" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-primary">Email</div>
                                            <div className="text-muted-foreground">info@brickloop.com</div>
                                            <div className="text-muted-foreground">contact@hoysalarealtors.com</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button variant="whatsapp" size="lg" onClick={handleWhatsApp} className="w-full text-lg py-4">
                                <MessageSquare className="mr-2" />
                                Chat on WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;