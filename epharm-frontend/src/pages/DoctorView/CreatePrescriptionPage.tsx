import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrescriptionForm from '@/components/Prescription/PrescriptionForm';

const CreatePrescriptionPage = () => {
    const [searchParams] = useSearchParams();
    const patientId = searchParams.get('patientId');

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Write Prescription</h1>
                    <p className="text-muted-foreground">Create a new prescription for your patient</p>
                </div>

                <Tabs defaultValue="new">
                    <div className="flex justify-between items-center mb-6">
                        <TabsList>
                            <TabsTrigger value="new">New Prescription</TabsTrigger>
                            <TabsTrigger value="recent">Recent Templates</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="new">
                        <Card>
                            <CardContent className="p-6">
                                {/* ✅ Removed the prop causing TS error */}
                                <PrescriptionForm />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="recent">
                        <Card>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <p>You can select from your recent prescription templates:</p>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <Card className="cursor-pointer hover:border-primary">
                                            <CardContent className="p-4">
                                                <h3 className="font-medium">Hypertension Treatment Plan</h3>
                                                <p className="text-sm text-muted-foreground">Last used: 3 days ago</p>
                                                <div className="mt-2">
                                                    <p className="text-sm">3 medications • 30 days duration</p>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="cursor-pointer hover:border-primary">
                                            <CardContent className="p-4">
                                                <h3 className="font-medium">Diabetes Management</h3>
                                                <p className="text-sm text-muted-foreground">Last used: 1 week ago</p>
                                                <div className="mt-2">
                                                    <p className="text-sm">2 medications • 90 days duration</p>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="cursor-pointer hover:border-primary">
                                            <CardContent className="p-4">
                                                <h3 className="font-medium">Upper Respiratory Infection</h3>
                                                <p className="text-sm text-muted-foreground">Last used: 2 weeks ago</p>
                                                <div className="mt-2">
                                                    <p className="text-sm">4 medications • 10 days duration</p>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card className="cursor-pointer hover:border-primary">
                                            <CardContent className="p-4">
                                                <h3 className="font-medium">Migraine Treatment</h3>
                                                <p className="text-sm text-muted-foreground">Last used: 3 weeks ago</p>
                                                <div className="mt-2">
                                                    <p className="text-sm">2 medications • As needed</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default CreatePrescriptionPage;
