<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    use HasFactory;

    protected $fillable = [
        'Date/Time Fault Reported',
        'Service Provider',
        'Fault Reported',
        'Category',
        'Reported By',
        'Reported By Email',
        'Assigned to',
        'Status Ascending 1',
        'Status color',
        'Date/Time Fault Resolved',
        'Time Lapsed in Days',
    ];

    protected $table = 'it_info';
    // You can define relationships, scopes, and other methods here
}
