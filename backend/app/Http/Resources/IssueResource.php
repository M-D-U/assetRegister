<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IssueResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'date_time_fault_reported' => $this->{'Date/Time Fault Reported'},
            'service_provider' => $this->{'Service Provider'},
            'fault_reported' => $this->{'Fault Reported'},
            'category' => $this->Category,
            'reported_by' => $this->{'Reported By'},
            'reported_by_email' => $this->{'Reported By Email'},
            'assigned_to' => $this->{'Assigned to'},
            'status' => $this->Status,
            'status_color' => $this->{'Status color'},
            'date_time_fault_resolved' => $this->{'Date/Time Fault Resolved'},
            'time_lapsed_in_days' => $this->{'Time Lapsed in Days'},
        ];
    }
}
